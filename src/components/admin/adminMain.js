import {
    BarChartOutlined,
    FormOutlined,
    FileExcelOutlined,
    FileDoneOutlined,
    HomeOutlined,
    LogoutOutlined,
    CloudDownloadOutlined
} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import { Layout, Menu, theme, Modal } from 'antd';
import {Link, useNavigate, Route, Routes} from "react-router-dom";
import {BaseUrl} from "../../BaseUrl";
import axios from "axios";
import ReactPaginate from "react-paginate"
import {ToastContainer, toast} from 'react-toastify';
import Base from 'antd/es/typography/Base';
import Chart2 from './chart2';
const { Header, Sider, Content, Button, Input, Space, Table, } = Layout;



function AdminMain(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (id) => {
            setIsModalOpen(true);
    };


    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([])
    const [dataId, setDataId] = useState("")
    const [modalDataId, setModalDataId] = useState([])
    const [textMenu, setTextMenu] = useState("new")
    // const [status, setStatus] = useState("")
    const [text, setText] = useState(false)

    // console.log(dataStatus.typeof)


    useEffect(() => {
        notify();
    }, [text]);

    const notify = () => {
        if (text === ""){} else if(text === "Taklif tasdiqlandi!"){
            toast.success(text);
        }
        else{
            toast.error(text);
        }
        setText("")
    };

    const handleCancel = (status) => {
        setIsModalOpen(false);
        // setStatus(status)
    };

    // console.log(dataStatus)

    const logOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        navigate("/main_admin_sv_auth")
    }


    const getNewData = () =>{
        axios.get(BaseUrl+"/api/user/taklifs/" + textMenu +"/"+localStorage.getItem("id"),{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res.data.data)
            setData(res.data.data)
        }).catch(err=>{
            console.log(err, "salom")
        })
    }


    const getOneData = (id) =>{
        axios.get(BaseUrl+"/api/user/taklifs/"+id,{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            setDataId(id)
            setModalDataId(res.data.data)
            console.log(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    // console.log(dataId)




    const postStatus = (status) => {
      axios.post(BaseUrl+"/api/user/taklifs/check/"+modalDataId.id,{status},{
          headers:{
            "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
          }
      }).then(res=>{
          console.log(res.status)
          console.log(res)
          if(res.status === 200){
            getNewData()
            setText(res.data.result)
          }
        //   console.log(dataId)
      }).catch(err=>{
          console.log(err)
      })
    }


    const deleteData = (id) =>{
        axios.delete(BaseUrl+"/api/user/taklifs/"+id,{
            headers:{
                    "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
                }
        }).then(res=>{
            console.log(res)
            if(res.status === 201){
                getNewData()  
                console.log(res.data.result)
                setText(res.data.result)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    // let [forResData, setForResData] = useState("")

    // let forFileLink = <a href={BaseUrl+"/"+forResData}></a>

    // const forFile = (id) =>{
    //     axios.get(BaseUrl+"/api/taklifs/download/"+id).then(res=>{
    //         console.log(res)
    //         console.log(res.data)
    //         if(res.status === 200){
    //              setForResData(res.data)
                 
    //         }
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }

    useEffect(()=>{
        getNewData()
    },[textMenu])



    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        // console.log(Loading items from ${itemOffset} to ${endOffset});
            setCurrentItems(data && data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };


    return (
        <>
            <Layout>
            <ToastContainer/>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo_main_page">
                        <img className="img-for-logo" src="https://yt3.ggpht.com/a/AATXAJxvHU_V9ATaE-t_2rnF1-O8Kn6CLe1wAt_--w=s900-c-k-c0xffffffff-no-rj-mo" alt=""/>
                    </div>
                    <Menu className="big_menu" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item onClick={()=>setTextMenu("new")} className="menu-main-item" key="1">
                            <Link to="/main_admin_sv_main/">
                                <div className="in_menu_item">
                                <BarChartOutlined />
                                    <div className="for_menu_text">Statistika</div>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={()=>setTextMenu("new")} className="menu-main-item" key="2">
                            <Link to="/main_admin_sv_main/statistic">
                            <div className="in_menu_item">
                                <HomeOutlined/>
                                <div className="for_menu_text">Yangi arizalar</div>
                            </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={()=>{setTextMenu("fails");setItemOffset(0)}} className="menu-main-item" key="3">
                        <Link to="/main_admin_sv_main/statistic">
                        <div className="in_menu_item">
                            <FormOutlined />
                                <div className="for_menu_text">Ko'rib chiqilganlar</div>
                            </div>
                        </Link>
                        </Menu.Item>
                        <Menu.Item onClick={()=>{setTextMenu("done");setItemOffset(0)}} className="menu-main-item" key="4">
                        <Link to="/main_admin_sv_main/statistic">
                        <div className="in_menu_item">
                                <FileDoneOutlined />
                                <div className="for_menu_text">Bajarilgan murojaatlar</div>
                            </div>  
                        </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: "0 30px 0 0", background: "dark", display:"flex", justifyContent:"end", alignItems:"center"}}>
                        
                       <div style={{cursor:"pointer"}} onClick={logOut} className="log_out d-flex align-items-center">
                           <p style={{color:"white", margin:"10px 5px"}}>Chiqish</p>
                           <LogoutOutlined />
                       </div>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, minHeight: "81.5vh", background: colorBgContainer,}}>
                       {
                        <Routes>
                            <Route path="/" element={<Chart2/>}/>
                            <Route path="/statistic" element={<>
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
                                    <tr onClick={()=>{showModal(); getOneData(item.id)}} key={index}>
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
                            </>}/>
                        </Routes>
                       }
                    </Content>
                </Layout>
                
                {
                    modalDataId.status === 0 ? 
                    <Modal title="Barcha ma'lumotlar" open={isModalOpen} onCancel={handleCancel}>
                    <div className="d-flex">
                        <h6>Kategoriya: </h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.category}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Muammo:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muammo}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Kutilayotgan natija:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muammoNatija}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Muallif:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muallif}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Muallif ma'lumoti:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muallifInfo}</p>
                    </div>
                    
                    <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <button className="btn btn-primary" onClick={()=>{handleCancel(2); postStatus(2)}}>Ko'rib chiqilganlar</button>
                        <button className="btn btn-success" onClick={()=>{handleCancel(1); postStatus(1)}}>Bajarilganlar</button>
                    </div>
                </Modal> 
                :
                <Modal title="Barcha ma'lumotlar" open={isModalOpen} onCancel={handleCancel}>
                    <div className="d-flex">
                        <h6>Kategoriya: </h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.category}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Muammo:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muammo}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Kutilayotgan natija:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muammoNatija}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Muallif:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muallif}</p>
                    </div>
                    <div className="d-flex">
                        <h6>Muallif ma'lumoti:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muallifInfo}</p>
                    </div>
                    <div className="d-flex">
                        <h6>File:</h6>
                        <p style={{marginLeft:"8px", }}>{modalDataId.qushimchaFile ? <a href={BaseUrl+"/storage/"+modalDataId.qushimchaFile} target={"_blank"}><button  style={{width:"130px",border:"1px solid green",borderRadius:"10px", outline:"none", color:"green",height:"35px", marginTop:"-10px"}}><CloudDownloadOutlined /> yuklab olish</button></a> : "Qoshimcha file biriktirilmagan"}</p>
                    </div>
                    <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                        <button className="btn btn-danger" onClick={()=>{handleCancel(2); deleteData(modalDataId.id)}}>O'chirish</button>
                    </div>
                </Modal>
                }
                
            </Layout>
        </>
    );
}

export default AdminMain;