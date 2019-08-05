/**
 *    @filename   anya.js
 *    @desc       rescue anya
 */

function anya(farm, clearPath) {
    if (Packet.checkQuest(37, 1)) {
        Packet.questMessage("anya", "anya", 20136);
        Packet.questMessage("anya", "anya", 20014);
    }

    if (!Packet.checkQuest(37, 0) && farm) {
        return false;
    }

    if (Packet.checkQuest(37, 0) && !farm) {
        return true;
    }

    // custom function so we dont get multiple scrolls
    let receiveScroll = function() {
        let malah = getUnit(1, "malah");

        while (!malah) {
            Town.move(portalspot);
            Packet.flash(me.gid);
            delay(me.ping * 2);

            malah = getUnit(1, "malah");
        }

        if (malah) {
            while (!me.getItem(646)) {
                sendPacket(1, 0x31, 4, malah.gid, 4, 20132);
                delay((me.ping * 2) + 500);
            }

            return true;
        }

        return false;
    };

    me.overhead("starting anya");

    if (!Pather.checkWP(113)) {
        Pather.getWP(113, clearPath);
    } else {
        Pather.useWaypoint(113);
    }

    Pather.moveToExit(114, true, clearPath);
    Pather.moveToPreset(me.area, 2, 460, 0, 0, clearPath);

    let anya = getUnit(2, 558);

    if (anya) {
        Pather.moveToUnit(anya);
        sendPacket(1, 0x13, 4, 0x2, 4, anya.gid); // Rusher should be able to interact so quester can get the potion without entering
        delay(1000 + me.ping);
        me.cancel();
    }

    Town.goToTown();
    Packet.questMessage("portalspot", "malah", 20127);
    Pather.usePortal(114, me.name);

    anya = getUnit(2, 558);

    while (!anya.mode) {
        sendPacket(1, 0x13, 4, 0x2, 4, anya.gid);
        delay(me.ping);
    }

    Town.goToTown();
    receiveScroll();
    Packet.questMessage("anya", "anya", 20136);
    Packet.questMessage("anya", "anya", 20014);

    return true;
}
