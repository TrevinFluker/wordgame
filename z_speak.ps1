# Add-Type -AssemblyName System.Speech

# # Create a new instance of the SpeechSynthesizer class
# $speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer

# $voice = $speaker.GetInstalledVoices().Where({$_.VoiceInfo.Gender -eq "Female"}).VoiceInfo
# $speaker.SelectVoice($voice.Name)

# # Define the filename
# $filename = "C:/Users/taflu/tiktoklive/html/chatGames/chatContexto/pronounce.txt"

# # Keep repeating the process
# while ($true) {
#     # Check if the file exists
#     if (Test-Path $filename) {
#         # Read the contents of the file
#         $fileContent = Get-Content $filename

#         # Speak the contents of the file
#         $speaker.Speak($fileContent)
#     } else {
#         Write-Output "File $filename not found."
#     }

#     # Pause for 5 seconds before repeating
#     Start-Sleep -Seconds 5
# }

# Get all running processes
$processes = Get-Process

# Find Windows Media Player processes
$wmpProcesses = $processes | Where-Object { $_.ProcessName -eq "wmplayer" }

# Terminate Windows Media Player processes
if ($wmpProcesses) {
    foreach ($process in $wmpProcesses) {
        $process | Stop-Process -Force
        Write-Host "Windows Media Player process with ID $($process.Id) has been terminated."
    }
} else {
    Write-Host "No Windows Media Player processes found."
}

