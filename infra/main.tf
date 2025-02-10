terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

#############################
# VPC - Criação da Rede
#############################

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "fiap-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false
}

#############################
# EKS - Cluster Kubernetes
#############################
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"
  
  cluster_name    = "fiap-cluster"
  cluster_version = "1.28"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  # Habilita o uso de IRSA (IAM Roles for Service Accounts)
  enable_irsa = true

  eks_managed_node_groups = {
    default = {
      instance_types = ["t3.medium"]
      min_size       = 1
      max_size       = 3
      desired_size   = 2
    }
  }
}

# Data source para obter o OIDC Provider criado pelo módulo EKS
data "aws_iam_openid_connect_provider" "eks" {
  url = module.eks.cluster_oidc_issuer_url
}

#############################
# ECR - Repositório para Imagens
#############################
resource "aws_ecr_repository" "api" {
  name = "api-repository"
}

resource "aws_db_subnet_group" "default" {
  name       = "fiap-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
  tags = {
    Name = "fiap-db-subnet-group"
  }
}

#############################
# Security Group para RDS MySQL
#############################
resource "aws_security_group" "mysql_sg" {
  name        = "mysql-security-group"
  description = "Allow MySQL inbound traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#############################
# RDS - Instância MySQL
#############################
resource "aws_db_instance" "mysql" {
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  username             = "admin"
  password             = "fiap-mysql-123!"
  allocated_storage    = 20
  publicly_accessible  = true
  skip_final_snapshot  = true

  vpc_security_group_ids = [aws_security_group.mysql_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.default.name

}

#############################
# IAM Role para a API (IRSA)
#############################
# Este role será associado ao ServiceAccount dos pods da API.
# Atenção: ajuste o namespace e o nome do service account conforme sua configuração.
resource "aws_iam_role" "api_role" {
  name = "api-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = data.aws_iam_openid_connect_provider.eks.arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringEquals = {
            # Remove o "https://" da URL do provider para formar a chave corretamente
            "${replace(module.eks.cluster_oidc_issuer_url, "https://", "")}:sub" = "system:serviceaccount:default:api-serviceaccount"
          }
        }
      }
    ]
  })
}

#############################
# Outputs
#############################
output "vpc_id" {
  description = "ID da VPC criada"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "Subnets privadas da VPC"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "Subnets públicas da VPC"
  value       = module.vpc.public_subnets
}

output "eks_cluster_endpoint" {
  description = "Endpoint do cluster EKS"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_oidc_issuer_url" {
  description = "URL do OIDC Issuer do cluster EKS"
  value       = module.eks.cluster_oidc_issuer_url
}

output "ecr_repository_url" {
  description = "URL do repositório ECR para a API"
  value       = aws_ecr_repository.api.repository_url
}

output "mysql_endpoint" {
  description = "Endpoint da instância RDS MySQL"
  value       = aws_db_instance.mysql.endpoint
}
