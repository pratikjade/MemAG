# Use official Node image
FROM node:25-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Expose Vite port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]



#docker build --no-cache -t memag-frontend .
#docker build -t memag-frontend .

#docker run -it memag-frontend sh
#docker run -p 5173:5173 memag-frontend
