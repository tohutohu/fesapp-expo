FROM node
RUN apt update && apt upgrade -y && apt install git -y
RUN npm install -g exp
ENV HOME=/work
WORKDIR /work
COPY client/package.json client/package-lock.json /work/
RUN npm i

