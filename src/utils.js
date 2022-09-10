import { faq } from "./assets/dummyData";

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
export const setInitialDataToDb = () => {
    localStorage.setItem(
        "initialdata",
        JSON.stringify({
            logo: "https://picsum.photos/200",
            title: "Edit commuity title",
            heroImage:
                "https://shape.co/static/media/shape-learning-platform.2cbefe0dab11167fbd86.webp",
            heroHeading:
                "This is hero heading text click on a edit button and edit it according to your need",
            heroSubHeading:
                " This is hero sub heading text click on a edit button and edit it according to your need",
            textBelowHeroSection:
                " This is text below hero section text click on a edit button and edit it according to your need",
            communityOwnerImage: "https://picsum.photos/100",
            communityOwnerName: "John Doe",
            communityOwnerHeading: "Community Owner",
            communityOwnerDescription:
                "This is community owner description text click on a edit button and edit it according to your need",
            edit: false,
            saved: false,
            preview: false,
            aboutCommunityList: [
                {
                    id: 0,
                    content:
                        "A community is a social unit (a group of living things) with commonality such as place, norms, religion, values, customs, or identity. Communities may share a sense of place situated in a given geographical area (e.g. a ",
                },
                {
                    id: 1,
                    content:
                        " A community is a social unit (a group of living things) with commonality such as place, norms, religion, values, customs, or identity. Communities may share a sense  lorem ipsum dolor sit amet",
                },
                {
                    id: 2,
                    content:
                        "lorem ipsum dolor sit ame  A community is a social unit (a group of living things) with commonality such as place, norms, religion, ",
                },
                {
                    id: 3,
                    content:
                        "lorem ipsum dolor sit amet  A community is a social unit (a group of living things) with commonality such as place, norms, religion,",
                },
                {
                    id: 4,
                    content:
                        "lorem ipsum dolor sit amet  A community is a social unit (a group of living things) with commonality such as place, norms, religion,",
                },
                {
                    id: 5,
                    content:
                        "lorem ipsum dolor sit amet  A community is a social unit (a group of living things) with commonality such as place, norms, religion,",
                },
            ],
            faqs: faq,
        })
    );
};
