interface MovieListHeadingProps {
  heading: string;
}
const MovieListHeading = (props: MovieListHeadingProps) => {
  return (
    <div className="col">
      <h1>{props.heading}</h1>
    </div>
  );
};
export default MovieListHeading;
