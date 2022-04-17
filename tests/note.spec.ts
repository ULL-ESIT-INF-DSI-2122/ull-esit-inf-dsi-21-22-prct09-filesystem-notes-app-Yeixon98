import "mocha";
import { expect } from "chai";
import { Note } from "../src/note";

describe("Class Note Tests", () => {
  const nota1 = new Note("Test Title", "Test Body", "Rojo");
  it('Create Note', () => {
    expect(nota1).instanceOf(Note);
  });
  describe('Getters', () => {
    it('getTitle()', () => {
      expect(nota1.getTitle()).to.eql('Test Title');
    });
    it('getBody()', () => {
      expect(nota1.getBody()).to.eql('Test Body');
    });
    it('getColor()', () => {
      expect(nota1.getColor()).to.eql('Rojo');
    });
  });
  it('Test print', () => {
    expect(nota1.print()).to.eql("{\n\"title\": \"Test Title\",\n\"body\": \"Test Body\",\n\"color\": \"Rojo\"\n}")
  })
});
