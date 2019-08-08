import React from 'react';

const DataContainer = (props) => {
    const {movies, handleBtnClick} = props
    const newArray = Array.from(movies)
    
    let listContent = newArray.map((item, index) => {
        return(
			<div className="card" key={item['_id']}>
                <div className="img">
                    <img src={item['img']} className="imgPoster" />
                </div>
                <div className="info">
                    <div className="movie">
                        {item['movie']}
                    </div>
                    <div className="description">{item['desc']}</div>
                    <div>
                        <button className="delete-btn" onClick={()=> {handleBtnClick(item['_id'])}}>x</button>
                    </div>
                </div>
            </div>
		)
    });

    return(
        <div className="cardContainer">
            {listContent}
        </div> 
     )
}
export default DataContainer