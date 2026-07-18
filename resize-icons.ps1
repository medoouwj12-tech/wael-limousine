Add-Type -AssemblyName System.Drawing

$sourcePath = "D:\وائل\images\icon-512.png"
$source = [System.Drawing.Image]::FromFile($sourcePath)

# Sizes needed for PWA + favicons
$sizes = @{
  "favicon-16x16.png" = 16
  "favicon-32x32.png" = 32
  "favicon-48x48.png" = 48
  "apple-touch-icon.png" = 180
  "icon-192.png" = 192
  "icon-512.png" = 512
  "icon-maskable-512.png" = 512
}

$destDir = "D:\وائل\images"
$iconsDir = "D:\وائل\icons"

# Create icons dir if not exists
if (!(Test-Path $iconsDir)) { New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null }

foreach ($entry in $sizes.GetEnumerator()) {
  $name = $entry.Key
  $size = $entry.Value

  # For maskable, add 20% padding around the icon (Android safe zone)
  $isMaskable = $name -like "*maskable*"

  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $graphics = [System.Drawing.Graphics]::FromImage($bmp)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

  if ($isMaskable) {
    # Fill background with brand color (black) for maskable safe zone
    $graphics.Clear([System.Drawing.Color]::FromArgb(255, 5, 5, 5))
    $padding = [int]($size * 0.18)
    $drawSize = $size - (2 * $padding)
    $graphics.DrawImage($source, $padding, $padding, $drawSize, $drawSize)
    $bmp.Save("$iconsDir\$name", [System.Drawing.Imaging.ImageFormat]::Png)
  } else {
    $graphics.DrawImage($source, 0, 0, $size, $size)
    $bmp.Save("$destDir\$name", [System.Drawing.Imaging.ImageFormat]::Png)
  }

  $graphics.Dispose()
  $bmp.Dispose()
  Write-Output "Generated: $name ($size x $size)"
}

# Also copy main icon-192 and icon-512 to images/ root
Copy-Item "$destDir\icon-192.png" -Destination "$iconsDir\icon-192.png" -Force
Copy-Item "$destDir\icon-512.png" -Destination "$iconsDir\icon-512.png" -Force

$source.Dispose()
Write-Output "Done!"
