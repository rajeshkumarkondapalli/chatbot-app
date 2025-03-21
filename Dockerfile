FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PORT=10000

EXPOSE 10000

CMD ["flask", "run", "--host", "0.0.0.0", "--port", "10000"]
