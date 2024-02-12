FROM postgres:latest

# Copy sql files to entry point to be run automatically
WORKDIR /docker-entrypoint-initdb.d
COPY *.sql /docker-entrypoint-initdb.d/

# Optionally, you can set environment variables if needed

# Expose the port if your database requires it
EXPOSE 5432

# The CMD instruction specifies the command to run when the container starts
CMD ["postgres"]
