# Use a base image (replace 'base_image' with your desired base image)
FROM gpdowning/python:latest
# Install dependencies (if needed)
# RUN command_to_install_dependencies
RUN pip install flask
RUN pip install -U flask-cors
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
RUN python -m pip install requests
RUN pip install geopy
RUN pip install python-dotenv
RUN pip install sqlalchemy
RUN pip install tqdm
# RUN pip install -r requirements.txt

CMD bash