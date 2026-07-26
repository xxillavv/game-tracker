import { Zap } from "lucide-react"

export const Header = () => {
  return (
    <header className="container mx-auto mb-28 py-4">
      <div>
        <div>
          <a href="" className="flex items-center text-xl font-mono font-semibold tracking-wide">
            <span className="p-1.5 bg-turquoise border rounded-xl mr-2">
              <Zap />
            </span>

            NEXUS<span className="text-turquoise">.gg</span>
          </a>
        </div>
        <div></div>
      </div>
    </header>
  )
}
