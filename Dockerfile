# Use the official Docker Hub PostgreSQL image
FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=bgdemol

# Expose the PostgreSQL port
EXPOSE 5432