import "./card.css";

/******************* */
//Dummy Component
/******************* */

export default function card(
  cardNumber: number,
  onClick: (event: MouseEvent) => void
) {
  const card = document.createElement("div");
  card.classList.add("card-wraper");
  const cardContent = document.createElement("div");
  cardContent.classList.add("picture");
  cardContent.classList.add("opacity-0");
  cardContent.classList.add("picture" + cardNumber);
  cardContent.addEventListener("click", onClick);
  card.append(cardContent);
  return card;
}
