$mp3File = "confetti_sound.mp3"

# Check if the file exists
if (Test-Path -Path $mp3File) {
    # Play the MP3 file using the default associated application
    Invoke-Item $mp3File
} else {
    Write-Host "File not found: $mp3File"
}