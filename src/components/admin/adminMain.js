import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileExcelOutlined,
    FileDoneOutlined,
    HomeOutlined,
    LogoutOutlined,
    CloudDownloadOutlined
} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import { Layout, Menu, theme, Modal } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {BaseUrl} from "../../BaseUrl";
import axios from "axios";
import ReactPaginate from "react-paginate"
import {ToastContainer, toast} from 'react-toastify';
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
        if (text === ""){} else toast.error(text);
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
        axios.get(BaseUrl+"/api/taklifs/"+textMenu,{
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
        axios.get(BaseUrl+"/api/taklifs/"+id,{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            setDataId(id)
            setModalDataId(res.data.data)
            // console.log(id)
        }).catch(err=>{
            console.log(err)
        })
    }

    // console.log(dataId)




    const postStatus = (status) => {
      axios.post(BaseUrl+"/api/taklifs/check/"+modalDataId.id,{status},{
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
        axios.delete(BaseUrl+"/api/taklifs/"+id,{
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

    const forFile = (id) =>{
        axios.get(BaseUrl+"/api/taklifs/download/"+id).then(res=>{
            console.log(res)
            console.log(res.data)
            if(res.status === 200){
                <a href={BaseUrl+"/"+res.data} target="_blank"></a>
            }
        }).catch(err=>{
            console.log(err)
        })
    }

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
        setCurrentItems(data.slice(itemOffset, endOffset));
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
                            <div className="in_menu_item">
                                <HomeOutlined/>
                                <div className="for_menu_text">Yangi arizlar</div>
                            </div>
                        </Menu.Item>
                        {/* <button><a href="http://127.0.0.1:8000/taklifFile/download/31">swefwef</a></button> */}
                        <Menu.Item onClick={()=>setTextMenu("done")} className="menu-main-item" key="2">
                            <div className="in_menu_item">
                                <FileDoneOutlined />
                                <div className="for_menu_text">Qabul qilinganlar</div>
                            </div>
                        </Menu.Item>
                        <Menu.Item onClick={()=>setTextMenu("fail")} className="menu-main-item" key="3">
                            <div className="in_menu_item">
                                <FileExcelOutlined />
                                <div className="for_menu_text">Rad etilganlar</div>
                            </div>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: "0 30px 0 0", background: "dark", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                       <div style={{cursor:"pointer"}} onClick={logOut} className="log_out d-flex align-items-center">
                           <p style={{color:"white", margin:"10px 5px"}}>Chiqish</p>
                           <LogoutOutlined />
                       </div>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, minHeight: "81.5vh", background: colorBgContainer,}}>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">TR</th>
                                <th scope="col">Kategoriya</th>
                                <th scope="col">Muammo</th>
                                <th scope="col">Tavsiyalar</th>
                                <th scope="col">Muallif</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                               currentItems && currentItems.map((item, index)=>(
                                    <tr onClick={()=>{showModal(); getOneData(item.id)}} key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.category}</td>
                                        <td>{item.muammo}</td>
                                        <td>{item.muammoYechimi}</td>
                                        <td>{item.muallif}</td>
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
                        <h6>Kutilayotgan yechim:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muammoYechimi}</p>
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
                        <p style={{marginLeft:"8px", }}>{modalDataId.qushimchaFile ? <button onClick={()=>{forFile(modalDataId.id)}} style={{width:"130px",border:"1px solid green",borderRadius:"10px", outline:"none", color:"green",height:"35px", marginTop:"-10px"}}><CloudDownloadOutlined /> yuklab olish</button> : "Qoshimcha file biriktirilmagan"}</p>
                    </div>
                    <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                        <button className="btn btn-danger" onClick={()=>{handleCancel(2); postStatus(2)}}>Rad etish</button>
                        <button className="btn btn-primary" onClick={()=>{handleCancel(1); postStatus(1)}}>Qabul qilish</button>
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
                        <h6>Kutilayotgan yechim:</h6>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.muammoYechimi}</p>
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
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black"}}>{modalDataId.qushimchaFile ? <button><CloudDownloadOutlined /></button> : "Qoshimcha file biriktirilmagan"}</p>
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