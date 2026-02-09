document.addEventListener('DOMContentLoaded', () => {
    let draggedItem = null;

    const items = document.querySelectorAll(".item");
    const slots = document.querySelectorAll(".slot");

    // Event-Listener für Drag-Start
    items.forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItem = item;
            item.style.opacity = "0.5";
            e.dataTransfer.effectAllowed = "move";
        });

        item.addEventListener("dragend", (e) => {
            item.style.opacity = "1";
        });
    });

    // Event-Listener für Slots
    slots.forEach((slot) => {
        slot.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            slot.style.backgroundColor = "rgba(225, 225, 225, 0.3)";
        });

        slot.addEventListener("dragleave", (e) => {
            slot.style.backgroundColor = "";
        });

        slot.addEventListener("drop", (e) => {
            e.preventDefault();
            slot.style.backgroundColor = "";

            if (draggedItem) {
                // Hole das Item, das sich bereits im Ziel-Slot befindet (wenn es eins gibt)
                const targetItem = slot.querySelector(".item");

                // Wenn bereits ein Item im Ziel-Slot ist, verschiebe es zum Quell-Slot
                if (targetItem) {
                    const sourceSlot = draggedItem.parentElement;
                    sourceSlot.appendChild(targetItem);
                }

                // Verschiebe das gezogene Item zum Ziel-Slot
                slot.appendChild(draggedItem);
                draggedItem = null;
            }
        });
    });
});