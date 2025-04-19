export default function YellowBadge({
    
    text, 
}: {  
    text: string
}) { 
    return (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset"> 
                {text}</span>
    )
}
