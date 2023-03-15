import {
    CloudDownloadOutlined
} from '@ant-design/icons';
import React, { useState,useEffect } from "react";
import {Link, useNavigate, Route, Routes} from "react-router-dom";
import {BaseUrl} from "../../BaseUrl";
import axios from "axios";
import ReactPaginate from "react-paginate"
import {ToastContainer, toast} from 'react-toastify';
// const { Header, Sider, Content, Button, Input, Space, Table, } = Layout;

const User = () =>{

    const [user, setUser] = useState([])

    const getUser = () =>{
        axios.get(BaseUrl+"/api/admin/users",{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res.data)
            setUser(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getUser()
    },[])


    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        // console.log(Loading items from ${itemOffset} to ${endOffset});
        setCurrentItems(user.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(user.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, user]);

    const handleCancel = (status) => {
        // setIsModalOpen(false);
        // setStatus(status)
    }
    

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % user.length;
        setItemOffset(newOffset);
    };

    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">TR</th>
                        <th scope="col">Isim Familiya</th>
                        <th scope="col">Bo'lim</th>
                        <th scope="col">Email</th>
                        <th scope="col">Parol</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    currentItems && currentItems.map((item, index)=>(
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.bulim}</td>
                                <td>{item.email}</td>
                                <td>{item.password_visable}</td>
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

export default User;