import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function Jurusan() {
  const [jrs, setJrsn] = useState([]);
  const [show, setShow] = useState(false);
  const [namaJurusan, setNamaJurusan] = useState("");
  const [validation, setValidation] = useState({});
  const [editData, setEditData] = useState({
    id: null,
    nama_jurusan: ""
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get("http://localhost:3000/api/jurusan");
      const data = response.data.data;
      setJrsn(data);
    } catch (error) {
      console.error("Kesalahan: ", error);
    }
  };

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleNamaJurusanChange = (e) => {
    setNamaJurusan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/jurusan/store", {
        nama_jurusan: namaJurusan
      });
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Kesalahan: ", error);
      setValidation(error.response.data);
    }
  };

  const handleShowEditModal = (data) => {
    setEditData(data);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditDataChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/api/jurusan/update/${editData.id_j}`,
        { nama_jurusan: editData.nama_jurusan }
      );
      fetchData();
      handleCloseEditModal();
    } catch (error) {
      console.error("Kesalahan: ", error);
      setValidation(error.response.data);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/jurusan/delete/${id}`,{
        headers: {
        Authorization: `Bearer ${token}`,
       }
      })
      .then((response) => {
        fetchData();
        console.log("Data Berhasil Dihapus");
      })
      .catch((error) => {
        console.error("Gagal menghapus Data: ", error);
        alert("Gagal Mengapus Data. Silakan Coba lagi atau Hubungi Admin.");
      });
  };

  return (
    <Container style={{ margin: '50px auto', padding: '30px', background: '#f5f5f5', borderRadius: '8px', boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)' }}>
    <Row className="mb-3">
      <Col>
        <h2>Data Jurusan</h2>
        <Button variant="success" onClick={handleShow}>
          Tambah
        </Button>
      </Col>
    </Row>
    <Table bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Jurusan</th>
          <th colSpan={2}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {jrs.map((jurusan, index) => (
          <tr key={jurusan.id_j}>
            <td>{index + 1}</td>
            <td>{jurusan.nama_jurusan}</td>
            <td>
              <Button variant="info" onClick={() => handleShowEditModal(jurusan)}>
                EDIT
              </Button>
            </td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(jurusan.id_j)}>
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Data Jurusan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Jurusan:</label>
            <input
              type="text"
              className={`form-control ${validation.nama_jurusan ? "is-invalid" : ""}`}
              value={namaJurusan}
              onChange={handleNamaJurusanChange}
            />
            {validation.nama_jurusan && (
              <div className="invalid-feedback">{validation.nama_jurusan[0]}</div>
            )}
          </div>
          <Button variant="primary" type="submit">
            Kirim
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data Jurusan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Nama Jurusan:</label>
            <input
              type="text"
              className={`form-control ${validation.nama_jurusan ? "is-invalid" : ""}`}
              value={editData.nama_jurusan}
              onChange={(e) => handleEditDataChange("nama_jurusan", e.target.value)}
            />
            {validation.nama_jurusan && (
              <div className="invalid-feedback">{validation.nama_jurusan[0]}</div>
            )}
          </div>
          <Button variant="primary" type="submit">
            Simpan Perubahan
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  </Container>  
  );
}

export default Jurusan;
