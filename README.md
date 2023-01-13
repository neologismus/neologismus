# Neologismus
This is the unique service for parsing web-pages and saving found neologisms.  
The service is packed in Docker container.  
## How to build the service
**command:**  
docker-compose run  
## Structure (neologismus/packages/)
### Rss-parser
goes to a web-page and extracts all useful links
### Text-miner
goes to a web-page and extracts relevant text
### Classifier
parses a text and extracts new words using different filters
### Neologisms
builds and updates the database for the found words
### Client
code for our website https://neologism.us/  
