//displays imgur album (or local file upload?)

import 'react-slideshow-image/dist/styles.css'
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {Carousel, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';

import "./css/photoalbum.css"

//todo: fix UI
//todo: add modal to 'remove image' to confirm if they want to remove


// album i made for testing:
//https://imgur.com/a/rQIQZPd

export default function WidgetPhotoalbum(identifier) {
    const [images, setImages] = useState([]);
    const [widgetEdit, setWidgetEdit] = useState(false);
    const [displayButton, setDisplayButton] = useState(false);
    const [verifyImage, setVerifyImage] = useState("");

    window.addEventListener('editWidgets', () => {
        setWidgetEdit(!widgetEdit);
        setVerifyImage("");
        setDisplayButton(false);
    })

    useEffect(() => {
        if (images.length > 0) localStorage.setItem("carousel" + identifier.identifier, JSON.stringify(images));
    }, [images]);

    useEffect(() => {
        const tasksRaw = localStorage.getItem("carousel" + identifier.identifier);
        setImages(tasksRaw != null ? JSON.parse(tasksRaw) : []);
    }, []);

    useEffect(() => {
        window.addEventListener("storage", storage => {
            setImages(storage.newValue === null ? [] : JSON.parse(storage.newValue));
        })
    }, [])

    // I shamelessly stole this, i hate doing regular expressions from scratch
    const isValidUrl = urlString => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    const checkImage = (e) => {
        // display image to verify it works
        if (!isValidUrl(e.currentTarget.value)) setDisplayButton(false);
        else setDisplayButton(true);
        setVerifyImage(e.currentTarget.value);

    }

    const saveImage = (e) => {
        e.preventDefault();
        setImages([...images, {imageUrl: verifyImage}]);
    }

    const removeImage = (e) => {
        e.preventDefault();
        // console.log(e.target.src);
        let newImage = images.filter(function (value) {
            return value.imageUrl !== e.target.src;
        })
        setImages(newImage);
        // console.log("length", newImage.length);
        // making sure last image is also removed from storage correctly:
        if (newImage.length === 0) localStorage.removeItem("carousel" + identifier.identifier);
    }

    //css
    const carouselImageStyle = {

    }

    const carouselEditMode = {
        width: `${100 / images.length}%`,
        opacity: 1,
    }


    const carouselGrid = images.map((image) =>
            <Image
                key={image.key}
                src={image.imageUrl}
                rounded
                style={carouselEditMode}
                onMouseOver={(e) => e.target.style.opacity = 0.5}
                onMouseLeave={(e) => e.target.style.opacity = 1}
                onClick={removeImage}
            />)


    return (
        <>
            {widgetEdit ?
                <Form className="mb-3" onSubmit={saveImage}>
                    <Form.Control type="text" placeholder="Enter image URL" onChange={checkImage} name="urlInput"/>
                    {displayButton ?
                        <>
                            <Image src={verifyImage} alt="verify image url" thumbnail/>
                            <Button type="submit">
                                Add to carousel
                            </Button>
                        </>
                        :
                        <>
                            <p>Click an image to remove it from carousel</p>
                            {carouselGrid}
                        </>}
                </Form>
                :
                <div>
                    {images.length === 0 ?
                        <h1 className="add-new-image-info">Add a new image using edit widgets button</h1>
                        :
                        <Carousel fade style={{position: "absolute"}}>
                            {images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img alt="carousel" src={image.imageUrl} className="carousel-image-style"/>
                                </Carousel.Item>
                            ))}
                        </Carousel> }

                </div>}
            </>
   );
}


