'use client';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from "./CustomNavbar.module.css";

interface CustomNavbarInterface {
    hrefLogo: string;
}

export const CustomNavbar = (props: CustomNavbarInterface) => {

    const { hrefLogo } = props;

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href={hrefLogo}>
                        <img src="/img/logo_rose.png" alt="" className={styles.logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={hrefLogo}>Início</Nav.Link>
                            {(hrefLogo === "./prchsfnncl") && (
                                <Nav.Link href="./novoPedido">Novo Pedido</Nav.Link>
                            )}
                            <Nav.Link href="./graficos">Gráficos</Nav.Link>
                            <Nav.Link href="./status">Status</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}