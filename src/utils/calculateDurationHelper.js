//Calculate msDuration if added manually
function calculateDuration(date, start, end) {
  const startTime = new Date(`${date} ${start}`);
  const endTime = new Date(`${date} ${end}`);
  
  let msDuration = endTime - startTime;
  
  return msDuration; // Returns ms
}

export default calculateDuration