import { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Button, Spinner, Modal, Form, Badge, Row, Col } from 'react-bootstrap';
import { adminApi } from '../api';
import { getImageUrl } from '../api';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [editUser, setEditUser] = useState(null);
  const [editCar, setEditCar] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadUsers = () => adminApi.users().then(setUsers);
  const loadCars = () => adminApi.cars().then(setCars);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadUsers(), loadCars()])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFreeze = async (u) => {
    try {
      await adminApi.freezeUser(u._id);
      loadUsers();
    } catch (e) {
      alert(e.message || 'Failed');
    }
  };

  const handleDeleteUser = async (u) => {
    if (!confirm(`Delete user "${u.name}" (${u.email})? Their listings will be deactivated.`)) return;
    try {
      await adminApi.deleteUser(u._id);
      loadUsers();
    } catch (e) {
      alert(e.message || 'Failed');
    }
  };

  const handleSaveUser = async () => {
    if (!editUser) return;
    setSaving(true);
    try {
      await adminApi.updateUser(editUser._id, {
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
        role: editUser.role,
      });
      loadUsers();
      setEditUser(null);
    } catch (e) {
      alert(e.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCar = async () => {
    if (!editCar) return;
    setSaving(true);
    try {
      await adminApi.updateCar(editCar._id, {
        title: editCar.title,
        description: editCar.description,
        price: editCar.price,
        isActive: editCar.isActive,
      });
      loadCars();
      setEditCar(null);
    } catch (e) {
      alert(e.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCar = async (car) => {
    if (!confirm(`Deactivate car "${car.title}"?`)) return;
    try {
      await adminApi.deleteCar(car._id);
      loadCars();
    } catch (e) {
      alert(e.message || 'Failed');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" className="spinner-glow" />
      </div>
    );
  }

  return (
    <Container className="py-4 py-lg-5">
      <h1 className="mb-4 fw-bold animate-fade-in">Admin Dashboard</h1>
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'users')} className="admin-tabs">
        <Tab eventKey="users" title="Users">
          <div className="mt-3">
            <Table responsive bordered hover className="table-hover-animate">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td><Badge bg={u.role === 'admin' ? 'danger' : u.role === 'seller' ? 'info' : 'secondary'}>{u.role}</Badge></td>
                    <td>
                      {u.isFrozen ? <Badge bg="warning">Frozen</Badge> : <Badge bg="success">Active</Badge>}
                    </td>
                    <td>
                      {u.role !== 'admin' && (
                        <>
                          <Button size="sm" variant="outline-primary" className="me-1" onClick={() => setEditUser({ ...u })}>Edit</Button>
                          <Button size="sm" variant={u.isFrozen ? 'outline-success' : 'outline-warning'} className="me-1" onClick={() => handleFreeze(u)}>
                            {u.isFrozen ? 'Unfreeze' : 'Freeze'}
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => handleDeleteUser(u)}>Delete</Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="cars" title="Cars">
          <div className="mt-3">
            <Table responsive bordered hover className="table-hover-animate">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <img src={getImageUrl(car.images?.[0]) || 'https://placehold.co/60x40?text=N/A'} alt="" style={{ width: 60, height: 40, objectFit: 'cover' }} />
                    </td>
                    <td>{car.title}</td>
                    <td>${car.price?.toLocaleString()}</td>
                    <td>{car.seller?.name || '—'}</td>
                    <td>{car.isActive ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}</td>
                    <td>
                      <Button size="sm" variant="outline-primary" className="me-1" onClick={() => setEditCar({ ...car })}>Edit</Button>
                      {car.isActive && <Button size="sm" variant="outline-danger" onClick={() => handleDeleteCar(car)}>Deactivate</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      {/* Edit User Modal */}
      <Modal show={!!editUser} onHide={() => setEditUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUser && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={editUser.phone || ''} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Role</Form.Label>
                <Form.Select value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })} disabled={editUser.role === 'admin'}>
                  <option value="user">user</option>
                  <option value="seller">seller</option>
                  <option value="admin">admin</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveUser} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Car Modal */}
      <Modal show={!!editCar} onHide={() => setEditCar(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editCar && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={editCar.title} onChange={(e) => setEditCar({ ...editCar, title: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={editCar.price} onChange={(e) => setEditCar({ ...editCar, price: Number(e.target.value) })} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={editCar.description} onChange={(e) => setEditCar({ ...editCar, description: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check type="switch" label="Active (visible on site)" checked={editCar.isActive} onChange={(e) => setEditCar({ ...editCar, isActive: e.target.checked })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditCar(null)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveCar} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
