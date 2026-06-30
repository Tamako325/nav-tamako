$ErrorActionPreference = "Stop"

function Invoke-Step {
  param(
    [Parameter(Mandatory = $true)]
    [scriptblock]$Command
  )

  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code $LASTEXITCODE"
  }
}

Write-Host "Deploy target: https://nav-tamako.pages.dev"
Write-Host ""
Write-Host "Step 1/3: Checking Node.js and npm..."
Invoke-Step { node --version }
Invoke-Step { npm --version }

Write-Host ""
Write-Host "Step 2/3: Cloudflare login is required."
Write-Host "If a browser opens, sign in to your Cloudflare account and approve Wrangler."
Invoke-Step { npx wrangler login }

Write-Host ""
Write-Host "Step 3/3: Deploying current folder to Cloudflare Pages..."
Write-Host "If Wrangler asks for the production branch name, enter: main"
Invoke-Step { npx wrangler pages deploy . --project-name nav-tamako --branch main }

Write-Host ""
Write-Host "Done. Open: https://nav-tamako.pages.dev"
