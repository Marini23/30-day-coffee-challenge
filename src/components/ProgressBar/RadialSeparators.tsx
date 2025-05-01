

interface RadialSeparatorsProps {
  count: number;
  style?: React.CSSProperties;
}

export const RadialSeparators: React.FC<RadialSeparatorsProps> = ({
  count,
  style,
}) => {
  const turns = 1 / count;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            height: "100%",
            transform: `rotate(${index * turns}turn)`,
          }}
        >
          <div
            style={{
              ...style,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
      ))}
    </>
  );
};
