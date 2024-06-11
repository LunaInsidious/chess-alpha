import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";

type PromotionModalProps = {
  handleClickPromotion: (piece: "Q" | "R" | "B" | "N") => void;
  playerColor?: "white" | "black";
};

export function PromotionModal({
  handleClickPromotion,
  playerColor,
}: PromotionModalProps) {
  const promotions: ("Queen" | "Rook" | "Bishop" | "Knight")[] = [
    "Queen",
    "Rook",
    "Bishop",
    "Knight",
  ];

  const typeDict: Record<
    "Queen" | "Rook" | "Bishop" | "Knight",
    "Q" | "R" | "B" | "N"
  > = {
    Queen: "Q",
    Rook: "R",
    Bishop: "B",
    Knight: "N",
  };
  return (
    <Modal header="Promotion">
      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        {promotions.map((piece) => (
          <div key={piece} className="flex flex-col font-serif md:text-xl">
            <div>{piece}</div>
            <Button
              className="mt-2"
              variant="secondary"
              onClick={() => handleClickPromotion(typeDict[piece])}
            >
              <img
                className="w-16 md:w-24 aspect-square"
                src={`/piece/${playerColor}_${typeDict[piece]}.png`}
                alt={piece}
              />
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
