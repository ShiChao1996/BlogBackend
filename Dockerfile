FROM node:6.11-alpine

ADD . /blog

ADD ./backend.sh /bin

RUN chmod 777 /bin/backend.sh

VOLUME /upload/images

EXPOSE 7001

CMD ["/bin/backend.sh"]
