# ScrapeCraft Runbook (WSL)

> [!TIP]
> AI-powered scraping editor using React and FastAPI to visually build and deploy ScrapGraphAI pipelines.

---

## ⚙️ Service Overview

* **WSL Location:** `/home/tpcoleary/workspace/scrapecraft`
* **Ports:** `3002` (React Frontend), `8012` (FastAPI Backend on the host; container listens on `8000`)
* **Databases:** PostgreSQL host `15433` (container `5432`), Redis host `16379` (container `6379`)
* **Model:** `gpt-5.3-codex` via LiteLLM proxy (`http://host.docker.internal:4000/v1`) — set in `.env`
* **Auto-updates:** Watchtower container polls every 5 minutes and restarts any container with a newer image — can cause unexpected restarts

> [!WARNING]
> Host Postgres is `15433` and host Redis is `16379`, so this stack does not take the default `5432` / `6379` ports. The API host port is `8012` so it does not take A2A Codex `8002`.

---

## 🔄 Service Control

* **Start Service:**
  ```bash
  cd ~/workspace/scrapecraft && docker compose up -d
  ```
* **Stop Service:**
  ```bash
  cd ~/workspace/scrapecraft && docker compose down
  ```
* **Restart Service:**
  ```bash
  cd ~/workspace/scrapecraft && docker compose restart
  ```
* **Status:**
  ```bash
  docker compose ps
  ```

---

## 🔍 Diagnostics & Logs

* **Health-check Frontend:** `http://localhost:3002`
* **Health-check Backend:** `http://localhost:8012/docs`
* **Docker Logs:**
  ```bash
  cd ~/workspace/scrapecraft && docker compose logs -f
  ```

---

## 🔐 Secrets

Keys are loaded into the backend container via `env_file` in `docker-compose.yml` — no shell environment variables required:

```yaml
env_file:
  - /home/tpcoleary/litellm-proxy/.env   # OPENROUTER_API_KEY, SCRAPEGRAPH_API_KEY
  - .env                                  # OPENROUTER_BASE_URL, OPENROUTER_MODEL, JWT_SECRET
```

`OPENROUTER_API_KEY` and `SCRAPEGRAPH_API_KEY` live in `~/litellm-proxy/.env` (master secrets file). The local `.env` holds non-secret config only. To rotate a key: edit `~/litellm-proxy/.env` and `docker compose up -d --force-recreate backend`.

---

## Related Docs
- Docker Compose Config: `file:///home/tpcoleary/workspace/scrapecraft/docker-compose.yml`
- Service Catalog entry: `file:///C:/Users/Win11Pro1Tim/projects/service-catalog/docs/service_catalog.md#scrapecraft-exited`
