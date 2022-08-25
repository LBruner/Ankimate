import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import userDecks from '../../../user/decks.json';
import {DeckProps} from "../../../models/WordInputProps";

const DeckPicker: NextPage<DeckProps> = ({deck, setDeck}) => {
    const [filteredDeck, setFilteredDeck] = useState([...userDecks.allDecks]);

    const searchBoxRef =  useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const getUserData = async () =>{
            await fetch('/api/fetchDecks')
        }

        if (userDecks.allDecks.length === 0)
            getUserData()
    }, []);
    
    const onChangeDeck = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDeck(event.target.value)
    };

    const onSearchLanguage = ()=>{
        const filteredDecks = userDecks.allDecks.filter(deckName => deckName.toLowerCase().startsWith(searchBoxRef.current!.value))
        setFilteredDeck(filteredDecks)
        setDeck(selectRef.current!.value)
    }
    
    return (
        <>
            <input ref={searchBoxRef} type="text" onChange={onSearchLanguage} placeholder={"Search..."} id={"search"}/>
            <select ref={selectRef} onChange={onChangeDeck} value={deck} name="deck">
                {filteredDeck.map(deckName => <option key={deckName} value={deckName}>{deckName}</option>)}
            </select>;
        </>
    );
};

export default DeckPicker;