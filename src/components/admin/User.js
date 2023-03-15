import React from "react";
const { Header, Sider, Content, Button, Input, Space, Table, } = Layout;
import {Link, useNavigate, Route, Routes} from "react-router-dom";
import {BaseUrl} from "../../BaseUrl";
import axios from "axios";
import ReactPaginate from "react-paginate"
import {ToastContainer, toast} from 'react-toastify';

const User = () =>{
    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">TR</th>
                        <th scope="col">Kategoriya</th>
                        <th scope="col">Murojaat mazmuni</th>
                        <th scope="col">Muallif</th>
                        <th scope="col">File</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    currentItems && currentItems.map((item, index)=>(
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.category}</td>
                                <td>{item.muammo}</td>
                                <td>{item.muallif}</td>
                                <td>
                                <p style={{marginLeft:"8px", }}>{item.qushimchaFile ? <a href={BaseUrl+"/storage/"+item.qushimchaFile} target={"_blank"}><button  style={{width:"130px",border:"1px solid green",borderRadius:"10px", outline:"none", color:"green",height:"35px", marginTop:"-10px"}}><CloudDownloadOutlined /> yuklab olish</button></a> : "Qoshimcha file biriktirilmagan"}</p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="my-pagination">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"
                />
            </div>
        </>
    )
}