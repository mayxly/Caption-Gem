import { useState } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../public/greengem.png"
import Image from "next/image";
import axios from 'axios';
const prompt_input: React.FC = () => {

    const [retval, setRetVal] = useState(null); 
    const [prompt, setPrompt] = useState("");
    const [isLoading, setisLoading] = useState(false);
    
    const onSubmit = () => {
        setisLoading(true)
        console.log("submitting");
        axios.get(`http://127.0.0.1:8000/generate_caption_and_hashtags?prompt=${prompt}`)
        .then(response => {
            console.log(response.data)
            setisLoading(false)
            setRetVal(response.data)})
    }

    const newCaption = () => {
        console.log("new");
        setRetVal(null)
        setPrompt(null)
    }

    return (
    <>
    <div style={{background: "#1a3b2d"}} className="text-center text-white w-50 rounded p-5 mt-5">
        <Image src={logo} width={70} height={70} />
        <h1 className="mt-3 text-center">Caption Gem</h1>
        <h5 className="text-center">Your AI Content Creator</h5>
        {!retval ? <p className="mt-5 lead" style={{textAlign:"left"}}>Tell me what your post is about and I'll generate a caption and hashtags for you!</p> : ""}
            {!retval ? <input type="text" placeholder="eg. Family ski trip" onChange={e => setPrompt(e.target.value)} 
                    style={{width: "100%", height: "50px", borderRadius: "10px"}}
                    className="px-3"></input> : "" }
        {isLoading ? <h5 className="mt-3">Loading...</h5> : ""}
        {retval ? <><h6 className="mt-4" style={{textAlign: "left", fontSize: "18px"}}>Prompt:</h6>
                    <div className="py-2 px-4 rounded" style={{background: "#507555", textAlign: "left"}}>
                    <p className="mt-3 lead">{prompt}</p>
                    </div></> : ""}
        {retval ? <><h6 className="mt-4" style={{textAlign: "left", fontSize: "18px"}}>Caption:</h6>
                    <div className="py-2 px-4 rounded" style={{background: "#507555", textAlign: "left"}}>
                    <p className="mt-3 lead">{retval?.caption}</p>
                    </div></> : ""}
        {retval ? <><h6 className="mt-4" style={{textAlign: "left", fontSize: "18px"}}>Hashtags:</h6>
                <div className="py-2 px-4 rounded d-flex gap-2" style={{background: "#507555", textAlign: "left", flexWrap: "wrap"}}>
                {retval?.hashtags.map((tag, idx) => {return <div key={idx} style={{background: "#38a71b", width:"fit-content"}} className="mt-2 rounded px-3 py-1">{tag}</div>})}
                </div></> : ""}
        {!retval 
            ? <button onClick={onSubmit}
                    className="mt-3 text-white font-weight-bold"
                    style={{width: "100%", height: "50px", borderRadius: "10px", fontSize: "20px",
                            background: "linear-gradient(90deg, rgba(37,143,10,1) 27%, rgba(56,167,27,1) 58%, rgba(108,236,75,1) 100%)"}}>Submit</button>
            : <button onClick={newCaption}
            className="mt-3 text-white font-weight-bold"
            style={{width: "100%", height: "50px", borderRadius: "10px", fontSize: "20px",
                    background: "linear-gradient(90deg, rgba(37,143,10,1) 27%, rgba(56,167,27,1) 58%, rgba(108,236,75,1) 100%)"}}>New Content</button> }
        
    </div>
    </>
    )
}

export default prompt_input