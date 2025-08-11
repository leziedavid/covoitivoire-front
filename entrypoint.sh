#!/bin/sh

ENV_FILE=/app/.env.local

if [ ! -f "$ENV_FILE" ]; then
  echo "⚠️ .env.local introuvable, création avec valeurs par défaut..."

  cat <<EOF > "$ENV_FILE"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
SIGNING_SECRET=

NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyCdiOlOkpX_KPF-e9HwNqtLYK7Rhoo3eAAtdl
NEXT_PUBLIC_WS_URL=http://localhost:4000/api
EOF

  echo "✅ .env.local créé."
else
  echo ".env.local trouvé, utilisation existante."
fi

# Lancer Next.js en mode production
npx next start -p 3000
