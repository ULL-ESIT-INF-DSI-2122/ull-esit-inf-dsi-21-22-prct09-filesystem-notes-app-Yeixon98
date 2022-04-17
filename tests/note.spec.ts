import "mocha";
import { expect } from "chai";
import { Note } from "../src/note";

describe("Class Note Tests", () => {
  const note = new Note("Test Title", "Test Body", "red");
  it('Create Note', () => {
    expect(note).instanceOf(Note);
  });
  describe('Getters', () => {
    it('getTitle()', () => {
      expect(note.getTitle()).to.eql('Test Title');
    });
    it('getBody()', () => {
      expect(note.getBody()).to.eql('Test Body');
    });
    it('getColor()', () => {
      expect(note.getColor()).to.eql('red');
    });
  });
  it('Test print', () => {
    expect(note.print()).to.eql("{\n\"title\": \"Test Title\",\n\"body\": \"Test Body\",\n\"color\": \"red\"\n}")
  })
});
