
function Card() {

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-between h-full bg-nape rounded-xs p-5">
                <div className="gap-1">
                    <p className="text-ciel font-gara text-xl">LE TITRE</p>
                    <p className="text-ciel font-gara text-md">
                        Hier soir j’ai cru que blabla et je lorem ipsum alors que pourtant blabla et je veux un gouter car parfois le soir de l’après la guerre de Troie et puis tu sais parfois blabla i love my husband et au revoir...
                    </p>
                </div> 
            
                <div className="flex flex-row justify-end gap-1">
                    <button className="border-1 px-2 rounded-full font-gara border-ciel text-ciel hover:bg-ciel hover:text-blood cursor-pointer" onClick={""}>❧</button>
                    <button className="border-1 px-2 rounded-full font-gara border-ciel text-ciel hover:bg-ciel hover:text-blood cursor-pointer" onClick={""}>del</button>
                </div>
                
            </div>

            <div className="font-gara italic text-blood text-end">
                <p>12/09/2025</p>
            </div>
        </div>
    )
}

export default Card;