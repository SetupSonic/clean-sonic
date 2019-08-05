/**
 *    @filename   Runewords.js
 *    @desc       make and reroll runewords
 */

// don't wait until base is found to pick runes
Runewords.buildLists = function () {
    var i, j, k, items, hel, baseCheck;

    this.validGids = [];
    this.needList = [];
    items = me.findItems(-1, 0);

    for (i = 0; i < Config.Runewords.length; i += 1) {
        if (!baseCheck) {
            baseCheck = this.getBase(Config.Runewords[i][0], Config.Runewords[i][1]) || this.getBase(Config.Runewords[i][0], Config.Runewords[i][1], true);
        }

    RuneLoop:
        for (j = 0; j < Config.Runewords[i][0].length; j += 1) {
            for (k = 0; k < items.length; k += 1) {
                if (items[k].classid === Config.Runewords[i][0][j] && this.validItem(items[k])) {
                    this.validGids.push(items[k].gid);
                    items.splice(k, 1);

                    k -= 1;

                    continue RuneLoop;
                }
            }
            this.needList.push(Config.Runewords[i][0][j]);
        }
    }

    // hel rune for rerolling purposes
    if (baseCheck) {
        hel = me.getItem(624, 0);

        if (hel) {
            do {
                if (this.validGids.indexOf(hel.gid) === -1 && this.validItem(hel)) {
                    this.validGids.push(hel.gid);

                    return;
                }
            } while (hel.getNext());
        }

        this.needList.push(624);
    }
};

// remove verbose logging
Runewords.makeRunewords = function () {
    if (!Config.MakeRunewords) {
        return false;
    }

    var i, items;

    while (true) {
        this.buildLists();

        items = this.checkRunewords(); // get a runeword. format = [base, runes...]

        if (!items) { // can't make runewords - exit loop
            break;
        }

        if (!Town.openStash()) {
            return false;
        }

        for (i = 1; i < items.length; i += 1) {
            this.socketItem(items[0], items[i]);
        }
    }

    me.cancel();

    this.rerollRunewords();

    return true;
};