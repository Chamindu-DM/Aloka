output "app_public_ip" {
  description = "Public IP of the application server"
  value       = aws_instance.app.public_ip
}

output "app_public_dns" {
  description = "Public DNS of the application server"
  value       = aws_instance.app.public_dns
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