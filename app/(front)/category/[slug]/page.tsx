type CategorySlugProps = {
    slug: string
}

export default function CategorySlug({params}: {params: CategorySlugProps}) {
    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    )
}