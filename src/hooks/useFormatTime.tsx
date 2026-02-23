// input -> ms
// output -> human readable: hours, minutes, seconds, autoFormat (displays best format based on current time) -> maybe i just keep last 1?




// Convert ms to human readable format
// Examples: "45s", "3min 20s", "1h 30min", "2h 0min"
function useFormatTime() {
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // If there are hours, always show hours and minutes (even if 0min)
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    
    // If there are minutes, show minutes and seconds
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    
    // Less than a minute, just show seconds
    return `${seconds}s`;
  }

  return formatTime;

}


export default useFormatTime
