//displays imgur album (or local file upload?)

import 'react-slideshow-image/dist/styles.css'
import './css/photoalbum.css'
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';

//todo: fix UI
//todo: add all CSS to this file

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

    // i shamelessly stole this, i hate doing regular expressions from scratch
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
                            {images.map((image, index) => (
                                <Image src={image.imageUrl} rounded key={index} style={{width:`${100/images.length}%`}} />
                            ))}
                        </>}
                    {/*//todo: instead of null show a list of all added images with option to remove entries*/}
                </Form>
                :
                <Carousel fade>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img alt="carousel" src={image.imageUrl}
                                 className="carousel-image"/>
                        </Carousel.Item>
                    ))}
                </Carousel>}
        </>

    );


}

