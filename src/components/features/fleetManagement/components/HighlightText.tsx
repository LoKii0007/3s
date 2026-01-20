interface HighlightedTextProps {
    text: string;
    query: string;
}

const HighlightedText = ({ text, query }: HighlightedTextProps) => {
    if (!query.trim()) {
        return <span>{text}</span>;
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerText.indexOf(lowerQuery);

    if (matchIndex === -1) {
        return <span>{text}</span>;
    }

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + query.length);
    const after = text.slice(matchIndex + query.length);

    return (
        <span>
            {before}
            <span className="bg-yellow-300 text-black rounded px-0.5">{match}</span>
            {after}
        </span>
    );
};

export default HighlightedText;