type Props = { progress: number }

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="progress" aria-hidden="true">
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
