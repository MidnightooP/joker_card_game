import Buffer "mo:base/Buffer";
import PseudoRandom "./rand";
import Nat32 "mo:base/Nat32";

module {

    public type Player = {
        var cards : [Card];
        name : Text;
    };

    public type GameState = {
        var deck : [Card];
        var players : [Player]; // karti na igrachite
        var started : Bool;
        var combos : [[Card]]; // grupi ot kombinirani karti
        var table : [Card]; // karti na masata
    };

    public type Color = {
        #clubs;
        #spades;
        #diamonds;
        #hearts;
        #joker;
    };

    public type Card = {
        color : Color;
        num : Nat;
    };

    public func create_deck() : [Card] {
        let deck = Buffer.Buffer<Card>(108);

        var d : Nat = 0;
        while (d < 2) {
            var i : Nat = 0;
            while (i < 54) {
                let num = i % 13 + 1;
                let colorIdx : Nat = i / 13;
                let color = switch (colorIdx) {
                    case (0) #clubs;
                    case (1) #spades;
                    case (2) #diamonds;
                    case (3) #hearts;
                    case (_) #joker;
                };
                deck.add({
                    color;
                    num = switch (color) {
                        case (#joker) 0;
                        case (_) num;
                    };
                });
                i += 1;
            };
            d += 1;
        };

        Buffer.toArray(deck);
    };

    public func shuffle(rand : PseudoRandom.PseudoRandom, inp : [Card]) : [Card] {
        let buf = Buffer.fromArray<Card>(inp);
        var i : Nat = buf.size() - 1;
        while (i > 0) {
            let j = Nat32.toNat(rand.get(8)) % (i + 1);
            let temp = buf.get(i);
            buf.put(i, buf.get(j));
            buf.put(j, temp);
            i -= 1;
        };

        Buffer.toArray(buf);
    };

    public func draw(inp : [Card], count : Nat) : ([Card], [Card]) {
        let buf = Buffer.fromArray<Card>(inp);
        let (drawn, remain) = Buffer.split<Card>(buf, count);
        (Buffer.toArray(drawn), Buffer.toArray(remain));
    };
    public func verification(inp : [Card]) : ([Card], Bool) {
        let buf = Buffer.fromArray<Card>(inp);
        let nbCards = buf.size();
        if (nbCards == 0) { return ([], true) };
        var isJoker : Nat = 0;
        var prevelem : Card = buf.get(0);
        if (prevelem.color == #joker) {
            isJoker := 1;
        };
        var i : Nat = 1;
        while (i < nbCards) {
            let elem = buf.get(i);
            if (elem.color == prevelem.color) {
                if (isJoker != 0) {
                    isJoker += 1;
                } else {
                    if ((prevelem.num + 1) != elem.num) {
                        return (inp, false);
                    };
                    prevelem := elem;
                };
            } else {
                if ((isJoker == 0) and (elem.color != #joker)) return (inp, false);
                if (isJoker == 0) {
                    if (prevelem.num == 13) return (inp, false);
                    buf.put(
                        i,
                        {
                            color = prevelem.color;
                            num = prevelem.num + 1;
                        },
                    );
                    prevelem := buf.get(i);
                };

                while (isJoker != 0) {
                    if ((elem.num - isJoker) < 1) return (inp, false);
                    buf.put(
                        i - isJoker,
                        {
                            color = elem.color;
                            num = elem.num - isJoker;
                        },
                    );

                    isJoker -= 1;
                };
                prevelem := buf.get(i);
            };

            i += 1;
        };
        if (isJoker != 0) return (inp, false);
        return (Buffer.toArray(buf), true);
    };

    public func score(inp : [Card]) : Nat {
        var sum = 0;
        var prevnum = 1;
        for (element in inp.vals()) {
            sum += 12; //element
            let mynum = switch (element.color) {
                case (#joker) prevnum + 1;
                case (_) element.num;
            };

            if (mynum <= 10) { sum += mynum } else if (mynum <= 12) {
                sum += 1;
            } else if (mynum <= 12) { sum += 1 };

            prevnum := mynum;
        };
        sum;
    };
};
