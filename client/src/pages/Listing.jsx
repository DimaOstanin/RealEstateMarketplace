import React, { useEffect } from 'react'
import { useParams} from 'react-router-dom';





export default function Listing() {
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async () => {
            
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setFormData(data)
        }

        fetchListing();
    },[])
  return (
    <div>Listing</div>
  )
}
