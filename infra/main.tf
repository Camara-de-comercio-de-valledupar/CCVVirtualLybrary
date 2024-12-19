provider "aws" {
  region = "us-east-2" # Cambia la región según tus necesidades
}



resource "aws_security_group" "main" {
  name_prefix = "aws_security_group"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port   = 22
    to_port     = 22
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

resource "aws_instance" "app_instance" {
  ami           = "ami-0b4624933067d393a" # Amazon Linux 2 AMI (Free Tier Eligible)
  instance_type = "t2.micro"
  security_groups = [aws_security_group.main.name]

  tags = {
    Name = "ccv-library-instance"
  }

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y git docker docker-compose
              service docker start

              sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

              sudo chmod +x /usr/local/bin/docker-compose

              docker-compose version
              cd /home/ec2-user
              git clone https://github.com/Camara-de-comercio-de-valledupar/CCVVirtualLybrary.git
              cd CCVVirtualLybrary

              sudo docker-compose up -d
              EOF
}