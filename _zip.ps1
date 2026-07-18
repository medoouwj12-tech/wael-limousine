
$ErrorActionPreference = "Stop"
$src = "D:\وائل"
$exclude = @("node_modules", "package-lock.json", "_demo_*.png", "_final_*.png", "screenshot.cjs", "resize-icons.ps1", "package.cjs", "Thumbs.db", ".DS_Store")

# Build file list manually
$files = Get-ChildItem -Path $src -Recurse -File | Where-Object {
  $rel = $_.FullName.Substring($src.Length)
  $relNorm = $rel -replace "\\", "/"
  $keep = $true
  foreach ($pat in $exclude) {
    if ($relNorm -like "*/$pat" -or $relNorm -like "$pat" -or $relNorm -like "*/$pat/*" -or $relNorm -like $pat) {
      $keep = $false
      break
    }
  }
  return $keep
}

Write-Output "Files to include: $($files.Count)"
foreach ($f in $files) {
  $rel = $f.FullName.Substring($src.Length).TrimStart('\\')
  Write-Output "  $rel"
}

# Use System.IO.Compression via .NET
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "C:\\Users\\Dell\\AppData\\Local\\Temp\\wael-limousine-2026-07-18.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($src, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $true)

Write-Output ""
Write-Output "ZIP created: $zipPath"
$size = (Get-Item $zipPath).Length
Write-Output ("Size: {0:N1} KB" -f ($size / 1024))
