
export default function EmailMatrix({ emailsUsed }: { emailsUsed: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={`aspect-square rounded-lg border grid place-items-center ${
            emailsUsed > i ? 'bg-green-100' : 'bg-white'
          }`}
        >
          {emailsUsed > i ? 'Sent ✓' : 'Available'}
        </div>
      ))}
    </div>
  );
}
