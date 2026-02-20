output "jenkins_public_ip" {
  description = "Public IP of the Jenkins CI/CD server"
  value       = aws_instance.jenkins.public_ip
}

output "jenkins_instance_id" {
  description = "Instance ID of Jenkins server"
  value       = aws_instance.jenkins.id
}

output "jenkins_public_dns" {
  description = "Public DNS of the Jenkins server"
  value       = aws_instance.jenkins.public_dns
}

output "jenkins_url" {
  description = "Jenkins Web UI URL"
  value       = "http://${aws_instance.jenkins.public_ip}:8080"
}

output "app_public_ip" {
  description = "Public IP of the application server"
  value       = aws_instance.app.public_ip
}

output "app_instance_id" {
  description = "Instance ID of application server"
  value       = aws_instance.app.id
}

output "app_public_dns" {
  description = "Public DNS of the application server"
  value       = aws_instance.app.public_dns
}

output "app_frontend_url" {
  description = "Application Frontend URL"
  value       = "http://${aws_instance.app.public_ip}"
}

output "app_backend_url" {
  description = "Application Backend URL"
  value       = "http://${aws_instance.app.public_ip}:5001"
}

output "db_endpoint" {
  description = "Database endpoint"
  value       = aws_db_instance.postgres.endpoint
  sensitive   = true
}

output "db_subnet_group_name" {
  description = "Name of the DB subnet group"
  value       = aws_db_subnet_group.main.name
}

output "jenkins_security_group_id" {
  description = "Security group ID for Jenkins"
  value       = aws_security_group.jenkins.id
}

output "app_security_group_id" {
  description = "Security group ID for the app"
  value       = aws_security_group.app.id
}

output "db_security_group_id" {
  description = "Security group ID for the database"
  value       = aws_security_group.db.id
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}