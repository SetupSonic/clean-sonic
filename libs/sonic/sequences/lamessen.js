/**
 *    @filename   lamessen.js
 *    @desc       complete lamessen
 */

function lamessen() {
    if (Packet.checkQuest(17, 0)) {
        return true;
    }

    me.overhead("starting lamessen");

    if (me.area != 75) {
        Town.goToTown(3);
    }

    Packet.questMessage("stash", "alkor", 564);

    return true;
}